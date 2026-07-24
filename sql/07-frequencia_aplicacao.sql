-- public.frequencia_aplicacao definition
-- Drop table
-- DROP TABLE public.frequencia_aplicacao;

create table public.frequencia_aplicacao (
	id serial4 not null,
	icon varchar(50) null,
	frequencia varchar(50) not null,
	instrumento_acao text not null,
	responsavel varchar(255) not null,
	ordem int4 not null,
	ativo bool default true null,
	created_at timestamp default now() null,
	constraint frequencia_aplicacao_pkey primary key (id)
);

    
INSERT INTO frequencia_aplicacao (
    icon,
    frequencia,
    instrumento_acao,
    responsavel,
    ordem
)
VALUES
(
    '☀️',
    'Diária',
    'Checklist de viatura e EPIs (início do plantão)',
    'Condutor + equipe',
    1
),
(
    '📋',
    'Semanal',
    'Análise de prontuários e KPIs operacionais',
    'Enfermeiro supervisor / coord.',
    2
),
(
    '📊',
    'Mensal',
    'Avaliação 360° por competências + feedback individual',
    'Chefia imediata',
    3
),
(
    '🎯',
    'Semestral',
    'Simulação realística bp-TEAM/NTS + debriefing em vídeo',
    'NEP / Coord. médica',
    4
),
(
    '🏆',
    'Anual',
    'PDI - revisão de metas e certificações (ACLS/PHTLS/BLS)',
    'Direção Técnica / CISBAF',
    5
);