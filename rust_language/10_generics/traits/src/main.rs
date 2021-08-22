// use traits::Summary;
// use traits::Tweet;

use traits::*;

struct TestStruct {
    test_summary: String,
}

impl Summary for TestStruct {
    fn summarize(&self) -> String {
        format!("{}", self.test_summary)
    }
}

fn main() {
    println!("Hello, world!");

    let tweet = Tweet {
        username: String::from("test_user"),
        content: String::from("test_content"),
        reply: false,
        retweet: false,
    };

    let ts = TestStruct {
        test_summary: String::from("test struct summary"),
    };

    println!("1 tweet: {}", tweet.summarize());
    println!("TestStriuct: {}", ts.summarize());
}
