/*==============================================================*/
/* DBMS name:      ORACLE Version 11g                           */
/* Created on:     2019-6-17 23:43:30                           */
/*==============================================================*/


alter table t_permission
   drop constraint FK_T_PERMIS_PERMISSIO_T_PERMIS;

alter table t_role_permission
   drop constraint FK_T_ROLE_P_T_ROLE_PE_T_PERMIS;

alter table t_role_permission
   drop constraint FK_T_ROLE_P_T_ROLE_PE_T_ROLE;

alter table t_user_role
   drop constraint FK_T_USER_R_T_USER_RO_T_ROLE;

alter table t_user_role
   drop constraint FK_T_USER_R_T_USER_RO_T_USER;

drop index permission_parent_FK;

drop table t_permission cascade constraints;

drop table t_role cascade constraints;

drop index t_role_permission_FK;

drop index t_role_permission2_FK;

drop table t_role_permission cascade constraints;

drop table t_user cascade constraints;

drop index t_user_role_FK;

drop index t_user_role2_FK;

drop table t_user_role cascade constraints;

/*==============================================================*/
/* Table: t_permission                                          */
/*==============================================================*/
create table t_permission 
(
   resource_id          INTEGER              not null,
   t_p_resource_id      INTEGER,
   resource_name        VARCHAR2(32)         not null,
   resource_des         VARCHAR2(64)         not null,
   parent               INTEGER,
   create_time          DATE                 not null,
   create_user          VARCHAR2(64)         not null,
   modify_time          DATE                 not null,
   modify_by            VARCHAR2(64)         not null,
   constraint PK_T_PERMISSION primary key (resource_id)
);

comment on table t_permission is
'权限列表';

/*==============================================================*/
/* Index: permission_parent_FK                                  */
/*==============================================================*/
create index permission_parent_FK on t_permission (
   t_p_resource_id ASC
);

/*==============================================================*/
/* Table: t_role                                                */
/*==============================================================*/
create table t_role 
(
   role_id              INTEGER              not null,
   role_name            VARCHAR2(64)         not null,
   role_des             VARCHAR2(128)        not null,
   create_time          DATE                 not null,
   create_user          VARCHAR2(64)         not null,
   modify_time          DATE                 not null,
   modify_by            VARCHAR2(64)         not null,
   constraint PK_T_ROLE primary key (role_id)
);

comment on table t_role is
'配置角色表';

/*==============================================================*/
/* Table: t_role_permission                                     */
/*==============================================================*/
create table t_role_permission 
(
   resource_id          INTEGER              not null,
   role_id              INTEGER              not null,
   constraint PK_T_ROLE_PERMISSION primary key (resource_id, role_id)
);

/*==============================================================*/
/* Index: t_role_permission2_FK                                 */
/*==============================================================*/
create index t_role_permission2_FK on t_role_permission (
   role_id ASC
);

/*==============================================================*/
/* Index: t_role_permission_FK                                  */
/*==============================================================*/
create index t_role_permission_FK on t_role_permission (
   resource_id ASC
);

/*==============================================================*/
/* Table: t_user                                                */
/*==============================================================*/
create table t_user 
(
   user_id              VARCHAR2(36)         not null,
   user_name            VARCHAR2(64)         not null,
   user_password        VARCHAR2(64)         not null,
   user_salt            VARCHAR2(32)         not null,
   create_time          DATE                 not null,
   create_user          VARCHAR2(64)         not null,
   modify_time          DATE                 not null,
   modify_by            VARCHAR2(64)         not null,
   constraint PK_T_USER primary key (user_id)
);

comment on table t_user is
'用户信息表';

comment on column t_user.user_id is
'系统设计的主键UUID';

comment on column t_user.user_name is
'定义通用的用户姓名格式';

/*==============================================================*/
/* Table: t_user_role                                           */
/*==============================================================*/
create table t_user_role 
(
   role_id              INTEGER              not null,
   user_id              VARCHAR2(36)         not null,
   constraint PK_T_USER_ROLE primary key (role_id, user_id)
);

comment on table t_user_role is
'用户和角色一对多';

comment on column t_user_role.user_id is
'系统设计的主键UUID';

/*==============================================================*/
/* Index: t_user_role2_FK                                       */
/*==============================================================*/
create index t_user_role2_FK on t_user_role (
   user_id ASC
);

/*==============================================================*/
/* Index: t_user_role_FK                                        */
/*==============================================================*/
create index t_user_role_FK on t_user_role (
   role_id ASC
);

alter table t_permission
   add constraint FK_T_PERMIS_PERMISSIO_T_PERMIS foreign key (t_p_resource_id)
      references t_permission (resource_id);

alter table t_role_permission
   add constraint FK_T_ROLE_P_T_ROLE_PE_T_PERMIS foreign key (resource_id)
      references t_permission (resource_id);

alter table t_role_permission
   add constraint FK_T_ROLE_P_T_ROLE_PE_T_ROLE foreign key (role_id)
      references t_role (role_id);

alter table t_user_role
   add constraint FK_T_USER_R_T_USER_RO_T_ROLE foreign key (role_id)
      references t_role (role_id);

alter table t_user_role
   add constraint FK_T_USER_R_T_USER_RO_T_USER foreign key (user_id)
      references t_user (user_id);

