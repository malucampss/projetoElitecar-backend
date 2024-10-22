CREATE TABLE Carro(
	id_carro SERIAL PRIMARY KEY,
	marca VARCHAR(50) NOT NULL,
	modelo VARCHAR(50) NOT NULL,
	ano INT,
	cor VARCHAR(20)
)

CREATE TABLE Cliente(
	id_cliente SERIAL PRIMARY KEY,
	nome VARCHAR(50) NOT NULL,
	cpf VARCHAR(11) UNIQUE NOT NULL,
	telefone VARCHAR(16)
)

CREATE TABLE Pedido_venda(
	id_pedido SERIAL PRIMARY KEY,
	id_cliente INT NOT NULL,
	id_carro INT NOT NULL,
	data_pedido DATE NOT NULL,
	valor_pedido DECIMAL(6) NOT NULL,
	FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente),
	FOREIGN KEY (id_carro) REFERENCES Carro(id_carro)
)

INSERT INTO Carro (marca, modelo, ano, cor)
VALUES 	('VOLKSWAGEN', 'Jetta', 2019, 'Branco'),
		('NISSAN', 'SENTRA', 2015, 'Branco'),
		('HONDA', 'CIVIC G10', 2021, 'Preto'),
		('HONDA', 'CIVIC TYPE R', 2024, 'Preto'),
		('AUDI', 'A3', 2024, 'Branco')

INSERT INTO cliente (nome, cpf, telefone)
VALUES 	('Pedro', '15569948303', '16 992800976'),
		('Gabriel', '24787654345', '16 993100230'),
		('Victor', '23309874503', '16 993203040'),
		('Jõao', '47799886838', '16 996301067'),
		('Yago', '47799828803', '16 996264015')

INSERT INTO Pedido_venda (id_cliente, id_carro, data_pedido, valor_pedido)
VALUES 	( 1, 1, '29/07/2024', 145.490),
		( 2, 2, '17/11/2024', 54.000),
		(3, 3, '04/10/2024', 228.000),
		(4, 4, '01/10/2024', 410.000),
		(5, 5, '04/11/2024', 227.990)