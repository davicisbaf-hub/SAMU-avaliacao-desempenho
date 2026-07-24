-- public.escala_likert definition
-- Drop table
-- DROP TABLE public.escala_likert;

create table public.escala_likert (
	nota int4 not null,
	titulo varchar(100) not null,
	descricao text not null,
	cor varchar(20) not null,
	constraint escala_likert_pkey primary key (nota)
);


INSERT INTO escala_likert
(nota, titulo, descricao, cor)
VALUES
(
    1,
    'Insatisfatório',
    'Não atende; requer intervenção imediata',
    '#dc2626'
),
(
    2,
    'Abaixo do esperado',
    'Atende parcialmente; necessita melhoria significativa',
    '#ea580c'
),
(
    3,
    'Regular',
    'Atende minimamente; há espaço para desenvolvimento',
    '#ca8a04'
),
(
    4,
    'Bom',
    'Atende plenamente os requisitos esperados',
    '#16a34a'
),
(
    5,
    'Excelente',
    'Supera as expectativas; referência para a equipe',
    '#2563eb'
);

CREATE TABLE pesos_avaliacao (
    valor INTEGER PRIMARY KEY,
    descricao VARCHAR(200) NOT NULL,
    cor VARCHAR(20) NOT NULL
);

INSERT INTO pesos_avaliacao
(valor, descricao, cor)
VALUES
(
    3,
    'Peso Alto (itens críticos)',
    '#cd0048'
),
(
    2,
    'Peso Médio',
    '#061c31'
),
(
    1,
    'Peso Baixo',
    '#555f69'
);


