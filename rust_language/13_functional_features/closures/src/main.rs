use std::thread;
use std::time::Duration;
fn main() {
    let simulated_user_specified_value = 10;
    let simulated_random_number = 7;

    generate_workout_without_closure(simulated_user_specified_value, simulated_random_number);
    generate_workout_without_closure_but_better(
        simulated_user_specified_value,
        simulated_random_number,
    );
    generate_workout_with_closure(simulated_user_specified_value, simulated_random_number);
}

fn generate_workout_without_closure(intensity: u32, random_number: u32) {
    println!("\nWithout closure");

    if intensity < 25 {
        println!(
            "Today, do {} pushups!",
            simulated_expensive_calculation(intensity)
        );
        println!(
            "Next, do {} situps!",
            simulated_expensive_calculation(intensity)
        );
    } else {
        if random_number == 3 {
            println!("Take a break today! Remember to stay hydrated!");
        } else {
            println!(
                "Today, run for {} minutes!",
                simulated_expensive_calculation(intensity)
            );
        }
    }
}

fn generate_workout_with_closure(intensity: u32, random_number: u32) {
    println!("\nWith closure");

    let expensive_closure = |num| {
        println!("calculating slowly...");
        thread::sleep(Duration::from_secs(2));
        num
    };

    if intensity < 25 {
        println!("Today, do {} pushups!", expensive_closure(intensity));
        println!("Next, do {} situps!", expensive_closure(intensity));
    } else {
        if random_number == 3 {
            println!("Take a break today! Remember to stay hydrated!");
        } else {
            println!("Today, run for {} minutes!", expensive_closure(intensity));
        }
    }
}

fn generate_workout_without_closure_but_better(intensity: u32, random_number: u32) {
    println!("\nWithout closure better");

    let expensive_result = simulated_expensive_calculation(intensity);

    if intensity < 25 {
        println!("Today, do {} pushups!", expensive_result);
        println!("Next, do {} situps!", expensive_result);
    } else {
        if random_number == 3 {
            println!("Take a break today! Remember to stay hydrated!");
        } else {
            println!("Today, run for {} minutes!", expensive_result);
        }
    }
}

fn simulated_expensive_calculation(intensity: u32) -> u32 {
    println!("calculating slowly...");
    thread::sleep(Duration::from_secs(2));
    intensity
}
