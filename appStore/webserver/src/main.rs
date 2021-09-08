mod models;

use actix_web::{web, App, HttpResponse, HttpServer, Result};
use models::Status;

async fn status() -> Result<HttpResponse> {
    Ok(HttpResponse::Ok().json(Status {
        status: "hello".to_string(),
    }))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("running server");
    HttpServer::new(|| App::new().route("/", web::get().to(status)))
        .bind("127.0.0.1:8080")?
        .run()
        .await
}
