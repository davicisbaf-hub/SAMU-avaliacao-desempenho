-- public.tipo_avaliacao definition
-- Drop table
-- DROP TABLE public.tipo_avaliacao;

create table public.tipo_avaliacao (
	id serial4 not null,
	nome varchar(150) not null,
	descricao varchar(150) not null,
	ativo bool default true not null,
	criado_em timestamp default CURRENT_TIMESTAMP null,
	constraint tipo_avaliacao_pkey primary key (id)
);


INSERT INTO tipo_avaliacao (nome, descricao)
VALUES
('autoavaliacao', 'Autoavaliação'),
('Lider > Liderado', 'Líder > Liderado'),
('Liderado > Lider', 'Liderado > Líder'),
('Par', 'Avaliação por Par');
