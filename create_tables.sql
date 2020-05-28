CREATE TABLE sheets (
    sh_password varchar(300) NOT NULL,
    sh_title varchar(255) NOT NULL,
    sh_need_update boolean DEFAULT true,
    PRIMARY KEY (sh_password)
);

CREATE TABLE sheet_rows (
    rw_id int NOT NULL AUTO_INCREMENT,
    rw_complete boolean DEFAULT false,
    rw_deleted boolean DEFAULT false,
    sh_password varchar(300) NOT NULL,
    fr_id int NOT NULL,
    PRIMARY KEY(rw_id),
    CONSTRAINT sh_password FOREIGN KEY (sh_password) REFERENCES sheets (sh_password),
    CONSTRAINT fr_id FOREIGN KEY (fr_id) REFERENCES furnitures (fr_id)
);

CREATE TABLE row_variation (
    rv_owned boolean DEFAULT false,
    rw_id int NOT NULL,
    vr_id int NOT NULL,
    KEY rw_id (rw_id),
    KEY vr_id (vr_id)
);

CREATE TABLE variations (
    vr_id int NOT NULL AUTO_INCREMENT,
    vr_en varchar(20) NOT NULL,
    vr_kr varchar(30),
    vr_img varchar(150),
    fr_id int NOT NULL,
    PRIMARY KEY(vr_id)
);
ALTER TABLE variations ADD CONSTRAINT FOREIGN KEY (fr_id) REFERENCES furnitures (fr_id);

CREATE TABLE furnitures (
    fr_id int NOT NULL AUTO_INCREMENT,
    fr_en varchar(50) NOT NULL,
    fr_kr varchar(80), 
    fr_price int,
    fr_preview_vr_id int,
    PRIMARY KEY(fr_id),
    CONSTRAINT fr_preview_vr_id FOREIGN KEY(fr_preview_vr_id) REFERENCES variations (vr_id)
);

CREATE TABLE tags (
    tg_id int NOT NULL AUTO_INCREMENT,
    tg_category varchar(40) NOT NULL,
    tg_content varchar(80) NOT NULL,
    PRIMARY KEY(tg_id)
);

CREATE TABLE using_tags (
    tg_id int NOT NULL,
    fr_id int NOT NULL,
    CONSTRAINT tg_id FOREIGN KEY(tg_id) REFERENCES tags (tg_id),
    CONSTRAINT fr_id FOREIGN KEY(fr_id) REFERENCES furnitures (fr_id)
);



-- dummy datas

-- Insert furniture information.
INSERT furnitures (fr_en, fr_kr, price) VALUES('English name!', 'Anyway KR name!', 37000);