-- public.usuarios definition
-- Drop table
-- DROP TABLE public.usuarios;

create table public.usuarios (
	id serial4 not null,
	nome varchar(150) not null,
	email varchar(255) not null,
	cpf varchar(255) not null,
	funcao varchar(255) not null,
	perfil varchar(100) not null,
	base varchar(100) null,
	ativo bool default true not null,
	criado_em timestamp default CURRENT_TIMESTAMP null,
	par jsonb default '[]'::jsonb null,
	senha_master bool default false null,
	senha text null,
	constraint usuarios_pkey primary key (id)
);


INSERT INTO public.usuarios (nome,email,cpf,funcao,perfil,base,ativo,criado_em,par,senha_master,senha) VALUES
	 ('Cisbaf','admin@admin.com','cisbaf','','Administrador / CISBAF','Japeri',true,'2026-07-15 09:09:02.248097','[]',false,'cisbaf'),
	 ('Cisbaf','admin@admin.com','cisbaf','','Administrador / CISBAF','Seropédica',true,'2026-07-15 09:09:02.248097','[]',false,'cisbaf'),
	 ('Cisbaf','admin@admin.com','cisbaf','Técnico de Enfermagem','Administrador / CISBAF','Nova Iguaçu',true,'2026-07-15 09:09:02.248097','[]',false,'cisbaf'),
	 ('Cisbaf','admin@admin.com','cisbaf','Médico','Administrador / CISBAF','Paracambi',true,'2024-06-10 10:02:38.389','[{"id": 2, "nome": "Lucas", "funcao": "Condutor"}, {"id": 3, "nome": "Juliana Teste", "funcao": "Enfermeiro"}, {"id": 4, "nome": "Adm teste", "funcao": "Enfermeiro"}, {"id": 1, "nome": "Cisbaf", "funcao": "Médico"}]',false,'cisbaf'),
	 ('Cisbaf','admin@admin.com','cisbaf','','Administrador / CISBAF','Queimados',true,'2026-07-15 09:09:02.248097','[]',false,'cisbaf'),
	 ('Cisbaf','admin@admin.com','cisbaf','','Administrador / CISBAF','Belford Roxo',true,'2026-07-15 09:09:02.248097','[]',false,'cisbaf'),
	 ('Cisbaf','admin@admin.com','cisbaf','','Administrador / CISBAF','Nilópolis',true,'2026-07-15 09:09:02.248097','[]',false,'cisbaf'),
	 ('Cisbaf','admin@admin.com','cisbaf','','Administrador / CISBAF','São João de Meriti',true,'2026-07-15 09:09:02.248097','[]',false,'cisbaf'),
	 ('Cisbaf','admin@admin.com','cisbaf','','Administrador / CISBAF','Duque de Caxias',true,'2026-07-15 09:09:02.248097','[]',false,'cisbaf'),
	 ('Cisbaf','admin@admin.com','cisbaf','','Administrador / CISBAF','Todas as Bases',true,'2026-07-15 09:09:02.248097','[]',false,'cisbaf');
INSERT INTO public.usuarios (nome,email,cpf,funcao,perfil,base,ativo,criado_em,par,senha_master,senha) VALUES
	 ('Cisbaf','admin@admin.com','cisbaf','Médico','Administrador / CISBAF','Itaguaí',true,'2024-06-10 10:02:38.389','[{"id": 2, "nome": "Lucas", "funcao": "Condutor"}, {"id": 3, "nome": "Juliana Teste", "funcao": "Enfermeiro"}, {"id": 4, "nome": "Adm teste", "funcao": "Enfermeiro"}, {"id": 1, "nome": "Cisbaf", "funcao": "Médico"}]',false,'cisbaf'),
	 ('Cisbaf','admin@admin.com','cisbaf','','Administrador / CISBAF','Mesquita',true,'2026-07-15 09:09:02.248097','[]',false,'cisbaf'),
	 ('Juliana Teste','teste@gmail.com','123456','Enfermeiro','Administrador / CISBAF','Itaguaí',true,'2026-06-10 17:41:51.295518','[]',false,'cisbaf'),
	 ('Cisbaf','admin@admin.com','cisbaf','','Administrador / CISBAF','Magé',true,'2026-07-15 09:09:02.248097','[]',false,'cisbaf'),
	 ('base2','adm@gmail.com','123','Enfermeiro','Coordenador de Base','Itaguaí',true,'2026-06-19 15:26:34.056221','[{"id": 5, "nome": "Outro", "funcao": "Técnico de Enfermagem"}, {"id": 3, "nome": "Juliana Teste", "funcao": "Enfermeiro"}, {"id": 1, "nome": "Cisbaf", "funcao": "Médico"}, {"id": 4, "nome": "Adm teste", "funcao": "Médico"}]',false,'teste'),
	 ('base1','adm@gmail.com','123','Médico','Coordenador de Base','Itaguaí',true,'2026-06-19 15:26:34.056221','[{"id": 3, "nome": "Juliana Teste", "funcao": "Enfermeiro"}, {"id": 2, "nome": "Lucas", "funcao": "Condutor"}, {"id": 5, "nome": "Outro", "funcao": "Técnico de Enfermagem"}]',false,'teste'),
	 ('Adm teste','adm@gmail.com','123','Médico','Coordenador de Base','Itaguaí',true,'2026-06-19 15:26:34.056221','[]',false,'teste'),
	 ('Outro','Outro@gmail.com','Outro','Técnico de Enfermagem','Coordenador de Base','Itaguaí',true,'2026-06-19 15:28:15.305826','[{"id": 6, "nome": "comun", "funcao": "Médico"}, {"id": 2, "nome": "Lucas", "funcao": "Condutor"}]',false,'Teste@123'),
	 ('Lucas','teste@gmail.com','teste','Enfermeiro','Coordenador de Base','Itaguaí',true,'2026-06-10 13:03:49.719749','[{"id": 5, "nome": "Outro", "funcao": "Técnico de Enfermagem"}]',false,'teste');
