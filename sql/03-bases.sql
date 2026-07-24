-- public.bases definition
-- Drop table
-- DROP TABLE public.bases;

create table public.bases (
	id serial4 not null,
	nome varchar(100) not null,
	cor varchar(20) not null,
	constraint bases_nome_key unique (nome),
	constraint bases_pkey primary key (id)
);


INSERT INTO public.bases (nome,cor) VALUES
	 ('Nova Iguaçu','#f97316'),
	 ('Duque de Caxias','#3b82f6'),
	 ('São João de Meriti','#22c55e'),
	 ('Belford Roxo','#a855f7'),
	 ('Queimados','#ef4444'),
	 ('Nilópolis','#eab308'),
	 ('Mesquita','#14b8a6'),
	 ('Seropédica','#6366f1'),
	 ('Japeri','#ec4899'),
	 ('Paracambi','#10b981'),
	 ('Magé','#f43f5e'),
	 ('Itaguaí','#0ea5e9'),
	 ('🔑 Administrador CRUR-BF (todas as bases)','#86090D');
