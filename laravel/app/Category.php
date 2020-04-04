<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Category extends Model
{
	/*nome da tabela*/
	protected $table 	= 	"categories";

    /*nome da chave primaria da tabela*/
	protected $primaryKey = 'id';

	/*nome dos atributos que poderão ser não alterados*/
	protected $guarded	= [''];

	/*nome dos atributos que poderão ser alterados*/
	protected $fillable = ['name','description'];

		/*nome dos atributos que representam as horas*/
	public $timestamps = false;

    public function category_entry(){
        return $this->belongsTo(Entry::class);
 	}
}