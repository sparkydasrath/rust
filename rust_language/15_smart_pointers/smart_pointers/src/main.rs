use std::ops::Deref;
fn main() {
    // let b = Box::new(5);
    // println!("b = {}", b);

    // let x = 5;
    // let y = &x;
    // let z = Box::new(x);

    // assert_eq!(5, x);
    // assert_eq!(5, *y);
    // assert_eq!(5, *z);

    // Using MyBoxOld
    /*
    let x = 5;
    let y = MyBoxOld::new(x);

    assert_eq!(5, x);
    assert_eq!(5, *y); // will not compile
    */

    let x = 5;
    let y = MyBox::new(x);

    assert_eq!(5, x);
    assert_eq!(5, *y); // will not compile
}

struct MyBox<T>(T);

impl<T> Deref for MyBox<T> {
    type Target = T;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl<T> MyBox<T> {
    // making our own Box type
    fn new(x: T) -> MyBox<T> {
        MyBox(x)
    }
}

// struct MyBoxOld<T>(T);

// impl<T> MyBoxOld<T> {
//     // making our own Box type
//     fn new(x: T) -> MyBoxOld<T> {
//         MyBoxOld(x)
//     }
// }
