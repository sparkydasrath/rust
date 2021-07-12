fn main() {
    // if statements

    let a = true;
    if a {
        println!("this is true");
    } else {
        println!("this is false")
    }

    // while loop
    let mut number = 3;
    while number != 0 {
        println!("number = {}", number);
        number -= 1;
    }

    println!("done!");

    // for loop
    let c = [1, 2, 3];
    for element in c.iter() {
        println!("array item = {}", element);
    }
}
