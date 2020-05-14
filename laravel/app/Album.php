<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\hasMany;

class Album extends Model
{
	/*nome da tabela*/
	protected $table 	= 	"albuns";

    /*nome da chave primaria da tabela*/
	protected $primaryKey = 'id';

	/*nome dos atributos que poderão ser não alterados*/
	protected $guarded	= [''];

	/*nome dos atributos que poderão ser alterados*/
	protected $fillable = ['name','description'];

    /*nome dos atributos de data*/
	protected $date = ['created_at','updated_at'];

    public function album(){
        return $this->hasMany(ImgAlbum::class);
 	}
}
