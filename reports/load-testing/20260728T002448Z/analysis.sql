CREATE TABLE loadtest_experiments (
    stage TEXT PRIMARY KEY,
    scenario TEXT NOT NULL,
    virtual_users INTEGER NOT NULL,
    requests INTEGER NOT NULL,
    achieved_rps REAL NOT NULL,
    success_rate REAL NOT NULL,
    request_p95_ms REAL NOT NULL,
    request_p99_ms REAL NOT NULL,
    external_health_availability REAL NOT NULL,
    service_cpu_average_cores REAL NOT NULL,
    service_memory_max_bytes INTEGER NOT NULL,
    database_growth_bytes INTEGER NOT NULL,
    llm_calls INTEGER NOT NULL,
    ledger_cost_usd REAL NOT NULL,
    decision TEXT NOT NULL
);

INSERT INTO loadtest_experiments VALUES
('baseline', 'baseline', 0, 600, 1.0, 1.0, 23.551, 25.417, 1.0, 0.001, 108814336, 0, 0, 0.0, 'PASS'),
('core-10-discovery', 'reload-heavy discovery', 10, 484, 2.264, 1.0, 69.52, 100.17, 1.0, 0.028, 114421760, 638976, 60, 0.010652291, 'DISCOVERY'),
('writes-10', 'writes', 10, 495, 2.302, 1.0, 97.13, 120.58, 1.0, 0.029, 115458048, 872448, 0, 0.0, 'PASS'),
('integrated-10', 'integrated with real AI', 10, 216, 0.676, 0.986111, 19278.49, 57950.99, 1.0, 0.01, 117399552, 471040, 79, 0.021963014, 'FAIL'),
('core-50', 'core', 50, 2428, 11.301, 1.0, 84.23, 122.53, 1.0, 0.098, 120152064, 2646016, 0, 0.0, 'PASS'),
('writes-50', 'writes', 50, 2408, 11.233, 1.0, 190.11, 317.91, 1.0, 0.136, 124559360, 4239360, 0, 0.0, 'PASS WITH DEGRADATION'),
('core-100', 'core', 100, 4808, 22.299, 1.0, 142.85, 252.69, 1.0, 0.199, 130281472, 5341184, 0, 0.0, 'PASS'),
('writes-100', 'writes', 100, 4520, 20.973, 1.0, 1218.16, 1786.97, 1.0, 0.256, 138661888, 7929856, 0, 0.0, 'FAIL'),
('core-300', 'core', 300, 9381, 43.108, 1.0, 3578.21, 6839.83, 0.89781, 0.366, 152088576, 10297344, 0, 0.0, 'FAIL');

CREATE TABLE cost_reconciliation (
    load_cost_usd REAL NOT NULL,
    pre_test_smoke_usd REAL NOT NULL,
    staging_total_cost_usd REAL NOT NULL,
    application_header_total_usd REAL NOT NULL,
    header_understatement_rate REAL NOT NULL
);

INSERT INTO cost_reconciliation VALUES
(0.032615305, 0.00116287, 0.033778175, 0.019627232, 0.661737376);
