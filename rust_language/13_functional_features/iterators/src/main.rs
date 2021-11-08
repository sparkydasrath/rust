fn main() {
    println!("Iterators");

    let v1 = vec![1, 2, 3];

    // create iterator
    let v1_iter = v1.iter();

    for val in v1_iter {
        // use iterator
        /*
        when we used a for loop because the loop took
        ownership of v1_iter and made it mutable behind the scenes
        */
        println!("Got: {}", val);
    }
}

#[cfg(test)]
mod tests {
    #[test]
    fn itertator_sum() {
        let v1 = vec![1, 2, 3];
        let v1_iter = v1.iter();
        let total: i32 = v1_iter.sum();
        assert_eq!(total, 6);
    }
}
