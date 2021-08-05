use std::ops::Add;

fn main() {
    // create strings
    let s1 = String::new();
    let s2 = "litral string".to_string();
    let s3 = String::from("string literal");

    // updating a string
    let mut s4 = String::from("foo");
    println!("Start string: {}", s4);
    s4.push_str("bar");
    println!("End string: {}", s4);

    // concatanation with + operator
    let s5 = String::from("one ");
    let s6 = String::from("two");
    let s7 = s5 + &s6; // note s5 has been moved here and can no longer be used
    println!("concat {}", s7);

    // using the format! macro
    let s8 = String::from("tic");
    let s9 = String::from("tac");
    let s10 = String::from("toe");

    let s11 = format!("{}-{}-{}", s8, s9, s10);
}
