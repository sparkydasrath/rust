fn main() {
    println!("Hello, world!");

    // create vector
    let v1: Vec<i32> = Vec::new();

    // create and infer type
    let v2 = vec![1, 2, 3]; // have the type of v2 inferred by using the vec! macro

    // to modify a vec you need to mark it mutable
    let mut v3 = vec![1, 2, 3, 4, 5];
    v3.push(6);

    // reading from vector
    // 1: indexing
    let third_item: &i32 = &v3[2];
    println!("The third element is {}", third_item);

    // 2: get()
    match v3.get(2) {
        Some(third) => println!("third = {}", third),
        None => println!("none"),
    }

    // iterating over vec
    let v4 = vec![1, 2, 3, 4];
    for i in &v4 {
        println!("i = {}", i);
    }
}
