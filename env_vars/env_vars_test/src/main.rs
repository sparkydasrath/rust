fn main() {
    println!("Hello, world!");

    for (n, v) in std::env::vars() {
        println!("{}: {}", n, v);
    }
}
