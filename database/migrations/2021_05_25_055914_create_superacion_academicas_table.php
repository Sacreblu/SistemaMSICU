<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSuperacionAcademicasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('superacion_academicas', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id('id');
            $table->bigInteger('Id_Profesor')->unsigned();
            $table->bigInteger('Tipo_Documento')->unsigned();
            $table->char('Titulo', 50);
            $table->integer('Anio');
            $table->char('Periodo', 40);
            $table->char('Descripcion', 180);
            $table->char('Ruta_Archivo', 200);
            $table->char('NombreArchivo', 100);
            $table->timestamps();
            
            $table->foreign('Id_Profesor')->references('id')->on('profesores')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('Tipo_Documento')->references('id')->on('documentos_superacions')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('superacion_academicas');
    }
}
