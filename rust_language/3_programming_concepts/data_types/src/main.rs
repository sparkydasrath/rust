fn main() {
    println!("Hello, world!");

    // Compound Types
    // 1. Tuple

    let tup1 = (500, 6.4, 1);
    let (a, b, c) = tup1;
    println!("Tuple val a = {}", a);
    println!("Tuple val b = {}", tup1.1);
    println!("Tuple val c = {}", tup1.2);
}
