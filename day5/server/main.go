
package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Config
var mongoUri string = "mongodb://localhost:27017"
var mongoDbName string = "Employee_app_db"
var mongoCollectionEmp string = "employees"

// Database variables
var mongoclient *mongo.Client
var employeeCollection *mongo.Collection

// Department Emp for Collection "employees"
type Emp struct {
	ID     primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Name string             `json:"name" bson:"name"`
	Department  string             `json:"department" bson:"department"`
	Position   string             `json:"position" bson:"position"`
}

// Connect to MongoDB
func connectDB() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var errrorConnection error
	mongoclient, errrorConnection = mongo.Connect(ctx, options.Client().ApplyURI(mongoUri))
	if errrorConnection != nil {
		log.Fatal("MongoDB Connection Error:", errrorConnection)
	}

	employeeCollection = mongoclient.Database(mongoDbName).Collection(mongoCollectionEmp)
	fmt.Println("Connected to MongoDB!")
}

// POST /employees
func createEmp(c *gin.Context) {
	var jbodyEmp Emp

	// Bind JSON body to jbodyEmp
	if err := c.BindJSON(&jbodyEmp); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Insert employee into MongoDB
	result, err := employeeCollection.InsertOne(ctx, jbodyEmp)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create employee"})
		return
	}

	// Extract the inserted ID
	employeeId, ok := result.InsertedID.(primitive.ObjectID)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse inserted ID"})
		return
	}
	jbodyEmp.ID = employeeId

	// Read the created employee from MongoDB
	var createdEmp Emp
	err = employeeCollection.FindOne(ctx, bson.M{"_id": jbodyEmp.ID}).Decode(&createdEmp)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch created employee"})
		return
	}

	// Return created employee
	c.JSON(http.StatusCreated, gin.H{
		"message": "Emp created successfully",
		"employee":     createdEmp,
	})
}

// GET /employees
func readAllEmps(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	cursor, err := employeeCollection.Find(ctx, bson.M{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch employees"})
		return
	}
	defer cursor.Close(ctx)

	// Ensure employees is an empty slice, not nil
	employees := []Emp{}
	if err := cursor.All(ctx, &employees); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse employees"})
		return
	}

	c.JSON(http.StatusOK, employees)
}

// GET /employees/:id
func readEmpById(c *gin.Context) {
	id := c.Param("id")
	fmt.Println("🔍 Received request for employee ID:", id)

	// Convert string ID to ObjectID
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		log.Println("❌ Invalid ID format:", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid employee ID format"})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var employee Emp
	err = employeeCollection.FindOne(ctx, bson.M{"_id": objectID}).Decode(&employee)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Println("⚠️ Employee not found for ID:", id)
			c.JSON(http.StatusNotFound, gin.H{"error": "Employee not found"})
			return
		}
		log.Println("❌ Error fetching employee:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Server error"})
		return
	}

	// Log successful fetch
	fmt.Println("✅ Employee found:", employee)

	c.JSON(http.StatusOK, employee)
}


// PUT /employees/:id
func updateEmp(c *gin.Context) {
	id := c.Param("id")
	// Convert string ID to primitive.ObjectID
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}
	var jbodyEmp Emp

	if err := c.BindJSON(&jbodyEmp); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var oldEmp Emp

	err = employeeCollection.FindOne(ctx, bson.M{"_id": objectID}).Decode(&oldEmp)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Emp not found"})
		return
	}
	if jbodyEmp.Name != "" {
		oldEmp.Name=jbodyEmp.Name
	}else{
		oldEmp.Name=oldEmp.Name
	}
	if jbodyEmp.Department != "" {
		oldEmp.Department=jbodyEmp.Department
	}else{
		oldEmp.Department=oldEmp.Department
	}
	if jbodyEmp.Position != "" {
		oldEmp.Position=jbodyEmp.Position
	}else{
		oldEmp.Position=oldEmp.Position
	}
	

	result, err := employeeCollection.UpdateOne(ctx, bson.M{"_id": objectID}, bson.M{"$set": oldEmp})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update employee"})
		return
	}

	if result.MatchedCount == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Emp not found"})
		return
	}
	// Return updated employee
	c.JSON(http.StatusOK, gin.H{
		"message": "Emp updated successfully",
		"employee":     oldEmp,
	})
}

// DELETE /employees/:id
func deleteEmp(c *gin.Context) {
	id := c.Param("id")
	// Convert string ID to primitive.ObjectID
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	result, errDelete := employeeCollection.DeleteOne(ctx, bson.M{"_id": objectID})
	if errDelete != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete employee"})
		return
	}

	if result.DeletedCount == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Emp not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Emp deleted successfully"})
}

func main() {
	// Connect to MongoDB
	connectDB()

	// Set up Gin router
	r := gin.Default()
	// CORS Configuration
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"}, // React frontend URL
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
	// Routes
	r.POST("/employees", createEmp)
	r.GET("/employees", readAllEmps)
	r.GET("/employees/:id", readEmpById)
	r.PUT("/employees/:id", updateEmp)
	r.DELETE("/employees/:id", deleteEmp)

	// Start server
	r.Run(":8080")
}
