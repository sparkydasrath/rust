fn main() {
    println!("Hello, world!");

    let home = IpAddr_3::V4(127, 0, 0, 1);
    let loopback = IpAddr_3::V6(String::from("::1"));
}

// most basic enum
enum IpAddr_1 {
    V4,
    V6,
}

//enum with data
enum IpAddr_2 {
    V4(String),
    V6(String),
}

// each variant can have different types and amounts of associated data
enum IpAddr_3 {
    V4(u8, u8, u8, u8),
    V6(String),
}
