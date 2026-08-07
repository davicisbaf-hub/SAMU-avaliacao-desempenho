-- public.frequencia_avaliacao definition
-- Drop table
-- DROP TABLE public.frequencia_avaliacao;

create table public.frequencia_avaliacao (
	id serial4 not null,
	tipo_avaliacao varchar(50) not null,
	dia int4 default 0 not null,
	semana int4 default 0 not null,
	mes int4 default 0 not null,
	ano int4 default 0 not null,
	ativo bool default true null,
	created_at timestamp default now() null,
	constraint frequencia_avaliacao_pkey primary key (id),
	constraint frequencia_avaliacao_tipo_avaliacao_key unique (tipo_avaliacao)
);


INSERT INTO frequencia_avaliacao (tipo_avaliacao, dia) VALUES ('autoavaliacao', 1);
INSERT INTO frequencia_avaliacao (tipo_avaliacao, dia) VALUES ('Liderado > Lider', 1);
INSERT INTO frequencia_avaliacao (tipo_avaliacao, dia) VALUES ('Lider > Liderado', 1);
INSERT INTO frequencia_avaliacao (tipo_avaliacao, dia) VALUES ('Par', 1);


