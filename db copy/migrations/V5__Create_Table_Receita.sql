CREATE  TABLE Receita (
  id INTEGER PRIMARY KEY AUTOINCREMENT  NOT NULL,
  idUsuario INTEGER NOT NULL,
  idCategoria INTEGER NOT NULL,
  data DATE,
  descricao TEXT NULL,
  valor REAL NULL);