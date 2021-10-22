use config::ConfigError;
use serde::Deserialize;

#[derive(Deserialize, Debug, Default)]
pub struct ServerConfig {
    pub host: String,
    pub port: i32,
}

#[derive(Deserialize, Debug, Default)]
pub struct MyConfig {
    pub server: ServerConfig,
}

impl MyConfig {
    pub fn from_env() -> Result<Self, ConfigError> {
        let mut cfg = config::Config::default();
        cfg.merge(config::Environment::new())?;
        cfg.try_into()
    }
}
