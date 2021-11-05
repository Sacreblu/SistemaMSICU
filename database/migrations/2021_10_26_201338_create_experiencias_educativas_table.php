<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExperienciasEducativasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('experiencias_educativas', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id("id");
            $table->bigInteger('id_Plan')->unsigned();
            $table->char('NombreEE', 150);
            $table->char('Area', 50);
            $table->integer('Creditos');
            $table->integer('HrsTeoriaConProfesor');
            $table->integer('HrsTeoriaSinProfesor')->default(0);;
            $table->integer('HrsPracticasConProfesor');
            $table->integer('HrsPracticasSinProfesor');
            $table->timestamps();

            $table->foreign('Id_Plan')->references('id')->on('plan_estudios')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('experiencias_educativas');
    }
}
