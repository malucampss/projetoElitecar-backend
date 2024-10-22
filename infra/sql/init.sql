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
VALUES 	('FORD', 'Focus', 2020, 'Azul'),
		('TOYOTA', 'Corolla', 2018, 'Prata'),
		('CHEVROLET', 'Onix', 2022, 'Vermelho'),
		('HYUNDAI', 'Elantra', 2023, 'Cinza'),
		('KIA', 'Seltos', 2024, 'Verde');

INSERT INTO cliente (nome, cpf, telefone)
VALUES 	('Ana', '12345678901', '16 991234567'),
		('Lucas', '98765432100', '16 992345678'),
		('Mariana', '23456789012', '16 993456789'),
		('Fernanda', '34567890123', '16 994567890'),
		('Rafael', '45678901234', '16 995678901');

INSERT INTO Pedido_venda (id_cliente, id_carro, data_pedido, valor_pedido)
VALUES 	( 1, 1, '10/08/2024', 120.000),
		( 2, 2, '15/09/2024', 85.000),
		( 3, 3, '20/07/2024', 95.000),
		( 4, 4, '12/10/2024', 150.000),
		( 5, 5, '30/11/2024', 190.000);
