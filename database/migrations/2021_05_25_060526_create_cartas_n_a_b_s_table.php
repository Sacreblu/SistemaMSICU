<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCartasNABSTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cartas_n_a_b_s', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id('id');
            $table->bigInteger('Id_Profesor')->unsigned();
            $table->char('NombreArchivo', 100);
            $table->char('Ruta_Archivo', 200);
            $table->char('Vigente', 3);
            $table->date('Fecha_Registro');
            $table->timestamps();

            $table->foreign('Id_Profesor')->references('id')->on('profesores')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cartas_n_a_b_s');
    }
}
