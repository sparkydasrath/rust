use std::fs::File;
use std::io::ErrorKind;

fn main() {
    let f1 = File::open("hello.txt");

    // 1 fail in all cases
    // let f1 = match f {
    //     Ok(file1) => file1,
    //     Err(error1) => panic!("Problem opening the file: {:?}", error1),
    // };

    // 2 fail in specific case
    // let f2 = match f {
    //     Ok(file2) => file2,
    //     Err(error) => match error.kind() {
    //         ErrorKind::NotFound => match File::create("hello.txt") {
    //             Ok(fc) => fc,
    //             Err(e) => panic!("Problem creating the file: {:?}", e),
    //         },
    //         other_error => {
    //             panic!("Problem opening the file: {:?}", other_error)
    //         }
    //     },
    // };

    // 3 using unwrap
    let f2 = File::open("hello2.txt").unwrap();
}
