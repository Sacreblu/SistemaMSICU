<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEvaluadoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('evaluadores', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->bigInteger('Id_Tesis')->unsigned();
            $table->bigInteger('Director')->unsigned();
            $table->text('Ruta_Ev_Director', 350)->nullable();
            $table->text('Nombre_Ev_Director', 250)->nullable();
            $table->bigInteger('Codirector')->unsigned()->nullable();
            $table->text('Ruta_Ev_Codirector', 350)->nullable();
            $table->text('Nombre_Ev_Codirector', 250)->nullable();
            $table->bigInteger('JuradoP')->unsigned()->nullable();
            $table->text('Ruta_Ev_JuradoP', 350)->nullable();
            $table->text('Nombre_Ev_JuradoP', 250)->nullable();
            $table->bigInteger('JuradoS')->unsigned()->nullable();
            $table->text('Ruta_Ev_JuradoS', 350)->nullable();
            $table->text('Nombre_Ev_JuradoS', 250)->nullable();
            $table->bigInteger('JuradoV')->unsigned()->nullable();
            $table->text('Ruta_Ev_JuradoV', 350)->nullable();
            $table->text('Nombre_Ev_JuradoV', 250)->nullable();

            $table->timestamps();
            
            $table->foreign('Id_Tesis')->references('id')->on('trabajos_recepcionales')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('Director')->references('id')->on('profesores')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('Codirector')->references('id')->on('profesores')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('JuradoP')->references('id')->on('profesores')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('JuradoS')->references('id')->on('profesores')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('JuradoV')->references('id')->on('profesores')->onDelete('cascade')->onUpdate('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('evaluadores');
    }
}
