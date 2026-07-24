-- public.fluxos_avaliacao definition
-- Drop table
-- DROP TABLE public.fluxos_avaliacao;

create table public.fluxos_avaliacao (
	id serial4 not null,
	titulo varchar(100) not null,
	descricao text not null,
	ordem int4 not null,
	ativo bool default true null,
	created_at timestamp default now() null,
	constraint fluxos_avaliacao_pkey primary key (id)
);


INSERT INTO fluxos_avaliacao (
    titulo,
    descricao,
    ordem
)
VALUES
(
    'Chefia → Equipe',
    'Avaliação da chefia/liderança para o profissional',
    1
),
(
    'Autoavaliação',
    'O profissional avalia a si mesmo',
    2
),
(
    'Equipe → Liderança',
    'A equipe avalia a liderança/coordenação',
    3
),
(
    'Simulação / bp-TEAM',
    'Avaliação em cenário simulado (bp-TEAM/NTS)',
    4
);