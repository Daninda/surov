-- MySQL Script generated by MySQL Workbench
-- Wed Nov  1 22:54:34 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Поставщик`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Поставщик` (
  `Код фирмы` INT NOT NULL,
  `Телефон` VARCHAR(45) NOT NULL,
  `E-mail` VARCHAR(45) NOT NULL,
  `Название фирмы` VARCHAR(45) NOT NULL,
  `Адрес веб-сайта` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Код фирмы`));


-- -----------------------------------------------------
-- Table `mydb`.`Клиент`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Клиент` (
  `ФИО` VARCHAR(45) NOT NULL,
  `Номер договора` INT NOT NULL,
  `Дата покупки` DATE NOT NULL,
  `Телефон` VARCHAR(45) NOT NULL,
  `Адрес` VARCHAR(45) NOT NULL,
  `Код модели` INT NOT NULL,
  PRIMARY KEY (`ФИО`));


-- -----------------------------------------------------
-- Table `mydb`.`Прейскурант цен`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Прейскурант цен` (
  `Код модели` INT NOT NULL,
  `Год выпуска` YEAR(4) NOT NULL,
  `Цена` INT NOT NULL,
  `Предпродажная подготовка` INT NOT NULL,
  `Транспортные издержки` INT NOT NULL,
  PRIMARY KEY (`Код модели`));


-- -----------------------------------------------------
-- Table `mydb`.`Модель автомобиля`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Модель автомобиля` (
  `Код модели` INT NOT NULL,
  `Наименование модели` VARCHAR(255) NOT NULL,
  `Цвет` VARCHAR(45) NOT NULL,
  `Обивка` VARCHAR(45) NOT NULL,
  `Мощность двигателя` INT NOT NULL,
  `Количество дверей` INT NOT NULL,
  `Коробка передач` VARCHAR(45) NOT NULL,
  `Поставщик_Код фирмы` INT NOT NULL,
  `Клиент_ФИО` VARCHAR(45) NOT NULL,
  `Прейскурант цен_Код модели` INT NOT NULL,
  PRIMARY KEY (`Код модели`),
  INDEX `fk_Модель автомобиля_Поставщик1_idx` (`Поставщик_Код фирмы` ASC) VISIBLE,
  INDEX `fk_Модель автомобиля_Клиент1_idx` (`Клиент_ФИО` ASC) VISIBLE,
  INDEX `fk_Модель автомобиля_Прейскурант_idx` (`Прейскурант цен_Код модели` ASC) VISIBLE,
  CONSTRAINT `fk_Модель автомобиля_Поставщик1`
    FOREIGN KEY (`Поставщик_Код фирмы`)
    REFERENCES `mydb`.`Поставщик` (`Код фирмы`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Модель автомобиля_Клиент1`
    FOREIGN KEY (`Клиент_ФИО`)
    REFERENCES `mydb`.`Клиент` (`ФИО`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Модель автомобиля_Прейскурант 1`
    FOREIGN KEY (`Прейскурант цен_Код модели`)
    REFERENCES `mydb`.`Прейскурант цен` (`Код модели`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;