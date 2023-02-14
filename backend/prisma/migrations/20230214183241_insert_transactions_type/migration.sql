-- This is an empty migration.
INSERT INTO app.TransactionType (description, nature, `signal`) VALUES('Venda produtor', 'Entrada', '+');
INSERT INTO app.TransactionType (description, nature, `signal`) VALUES('Venda afiliado', 'Entrada', '+');
INSERT INTO app.TransactionType (description, nature, `signal`) VALUES('Comissão paga', 'Saída', '-');
INSERT INTO app.TransactionType (description, nature, `signal`) VALUES('Comissão recebida', 'Entrada', '+');
