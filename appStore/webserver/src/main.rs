// see https://www.youtube.com/watch?v=gQwA0g0NNSI

mod config;
mod models;

use actix_web::{web, App, HttpResponse, HttpServer, Result};
// use config::Config;
use dotenv::dotenv;
use models::Status;

async fn status() -> Result<HttpResponse> {
    Ok(HttpResponse::Ok().json(Status {
        status: "hello".to_string(),
    }))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    // for (key, value) in std::env::vars() {
    //     println!("{}: {}", key, value);
    // }

    let cc = crate::config::MyConfig::from_env();
    println!("Printing results");
    println!("{:?}", cc);

    let config = crate::config::MyConfig::from_env().unwrap();

    println!(
        "Starting server at http://{}:{}/",
        config.server.host, config.server.port
    );
    HttpServer::new(|| App::new().route("/", web::get().to(status)))
        .bind(format!("{}:{}", config.server.host, config.server.port))?
        .run()
        .await
}
