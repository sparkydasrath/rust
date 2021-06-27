fn main() {
    // variables
    let mut x = 5;
    println!("value of x = {}", x);
    x = 6;
    println!("value of x = {}", x);

    // shadowing
    let a = 5;
    let a = a + 1;
    let a = a * 2;
    println!("value of a = {}", a);

    
}
