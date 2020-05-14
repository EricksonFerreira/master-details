<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ImgAlbum extends Model
{
	/*nome da tabela*/
	protected $table 	= 	"imgAlbuns";

    /*nome da chave primaria da tabela*/
	protected $primaryKey = 'id';

	/*nome dos atributos que poderão ser não alterados*/
	protected $guarded	= [];

	/*nome dos atributos que poderão ser alterados*/
    protected $fillable = ['name','album_id'];

	/*nome dos atributos de data*/
	protected $date = ['created_at','updated_at'];

    public function imagem(){
        return $this->belongsTo(Album::class);
 	}
}
