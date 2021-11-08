fn main() {
    println!("Iterators");

    println!("\n iterator consumer");
    let c1 = vec![1, 2, 3];
    // create iterator
    let c1_iter = c1.iter();
    for val in c1_iter {
        // use iterator
        /*
        when we used a for loop because the loop took
        ownership of v1_iter and made it mutable behind the scenes
        */
        println!("Consumer: {}", val);
    }

    println!("\n iterator producer");
    let p1 = vec![1, 2, 3];
    let p2: Vec<_> = p1.iter().map(|x| x + 1).collect();
    assert_eq!(p2, vec![2, 3, 4]);

    for val in p2 {
        println!("Producer {}", val);
    }
}
