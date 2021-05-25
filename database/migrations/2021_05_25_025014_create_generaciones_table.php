<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGeneracionesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('generaciones', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id("id");
            $table->integer('Generacion')->nullable($value = false)->unique();
            $table->char('Mes_Inicio', 10);
            $table->integer('Anio_Inicio')->unique();
            $table->char('Mes_Fin', 10);
            $table->integer('Anio_Fin')->unique();
            $table->char('Estado', 10);
            $table->bigInteger('Id_Plan')->unsigned();
            $table->timestamps();
            $table->foreign('Id_Plan')->references('id')->on('plan_estudios');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('generaciones');
    }
}
