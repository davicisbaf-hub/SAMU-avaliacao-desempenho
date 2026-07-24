-- public.avaliacoes definition
-- Drop table
-- DROP TABLE public.avaliacoes;

create table public.avaliacoes (
	id serial4 not null,
	avaliador_id int4 not null,
	avaliado_id int4 not null,
	modalidade text null,
	tipo_avaliacao varchar(100) not null,
	resultado jsonb not null,
	observacoes_gerais text null,
	pontos_melhorar text null,
	plano_acao text null,
	criado_em timestamp default CURRENT_TIMESTAMP null,
	constraint avaliacoes_pkey primary key (id)
);
-- public.avaliacoes foreign keys

alter table public.avaliacoes add constraint fk_avaliado foreign key (avaliado_id) references public.usuarios(id);

alter table public.avaliacoes add constraint fk_avaliador foreign key (avaliador_id) references public.usuarios(id);
