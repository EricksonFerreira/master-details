<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Imgalbuns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('imgAlbuns', function (Blueprint $table) {
            $table->id();
            $table->string('name');

            /** Chave Estrangeira do banco eventos*/
             $table->foreignId('album_id')->unsigned();
            $table->foreign('album_id')->references('id')->on('albuns');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('imgAlbuns');
    }
}
