package main
import "fmt"
type student struct{
	Name string
	Rgno int
	Marks int

}
func main(){
	calc()
	ThreeVarDemo()
	forPythonStyle()
	st:=student{Name:"Amulya",Rgno:21,Marks:100}
	fmt.Println(st.Name)
}
func calc(){
	/*var num1,num2 int
	fmt.Println("Enter two numbers")
	fmt.Scanln(&num1,&num2)
	result := num1+num2
	fmt.Println("THe result is: %d",result)
	mul :=num1*num2
	fmt.Println("THe result is: %d",mul)
	sub :=num1-num2
	fmt.Println("THe result is: %d",sub)
	div :=num1/num2
	fmt.Println("THe result is: %d",div)*/
	var age int
	fmt.Println("Enter your age")
	fmt.Scanln(&age)
	if(age>=18){
		fmt.Println("Adult eligible to vote")
	}else{
		fmt.Println("Minor-not eligible to vote")
	}
}
func ThreeVarDemo(){
	sum:=0
	for i:=1;i<5;i++{
		sum+=i
	}
	fmt.Println(sum)

}
func forPythonStyle(){
	strings := []string{"Hello","World","hi"}
	for i,s := range strings{
		fmt.Println(i,s)
	}
}
