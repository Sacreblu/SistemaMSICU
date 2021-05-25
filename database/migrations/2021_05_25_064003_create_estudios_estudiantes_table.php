<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEstudiosEstudiantesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('estudios_estudiantes', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id('id');
            $table->char('Titulo', 100)->nullable($value = false);
            $table->bigInteger('Id_Estudiante')->unsigned();
            $table->bigInteger('Id_Grado')->unsigned();
            $table->char('Universidad', 80)->nullable($value = false);
            $table->integer('Anio');
            $table->char('Lugar', 100)->nullable($value = false);
            $table->char('Ruta_Archivo', 250);
            $table->char('NombreArchivo', 150);
            $table->timestamps();
            
            $table->foreign('Id_Estudiante')->references('id')->on('estudiantes')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('Id_Grado')->references('id')->on('grados_academicos')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('estudios_estudiantes');
    }
}
