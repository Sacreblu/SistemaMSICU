<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProfesoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profesores', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id('id');
            $table->integer('No_CVU')->nullable($value = false)->unique();
            $table->char('Nombre', 30)->nullable($value = false);
            $table->char('Apellido_P', 20)->nullable($value = false);
            $table->char('Apellido_M', 20)->nullable($value = false);
            $table->char('Correo', 40)->nullable($value = false)->unique();
            $table->char('CorreoPersonal', 40)->nullable()->unique();
            $table->bigInteger('Tipo_Contratacion')->unsigned();
            $table->char('Institucion', 80)->nullable($value = false);
            $table->char('Mes_Ingreso', 12);
            $table->integer('Anio_Ingreso');
            $table->char('Mes_Salida', 12)->nullable();
            $table->integer('Anio_Salida')->nullable();
            $table->bigInteger('Tipo_Colaboracion')->unsigned();
            $table->date('Fecha_Ingreso_NAB')->nullable();
            $table->char('Estado', 15)->nullable($value = false);
            $table->bigInteger('Pais')->unsigned();
            $table->timestamps();

            $table->foreign('Tipo_Contratacion')->references('id')->on('tipos_contrataciones')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('Tipo_Colaboracion')->references('id')->on('tipos_colaboraciones')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('Pais')->references('id')->on('paises')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('profesores');
    }
}
