use std::io;

fn main() {
    println!("Enter temp in celsius");
    let mut temp = String::new();
    io::stdin()
        .read_line(&mut temp)
        .expect("failed to read from input");

    let temp: f64 = match temp.trim().parse() {
        Ok(num) => num,
        Err(_) => return,
    };

    let temp: f64 = cel_to_fah(temp);
    println!("Your temp in F is {}", temp);

    let fibo = fibo();
    println!("Fibonacci of 8 is {}", fibo);
}

fn cel_to_fah(temp: f64) -> f64 {
    temp * 1.8 + 32.0
}

fn fibo() -> u64 {
    let mut arr: [u64; 8] = [0; 8];
    arr[0] = 1;
    arr[1] = 1;
    for num in 2..8 {
        arr[num] = arr[num - 1] + arr[num - 2];
    }

    return arr[7];
}
