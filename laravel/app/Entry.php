<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Entry extends Model
{
	/*nome da tabela*/
	protected $table 	= 	"entries";

    /*nome da chave primaria da tabela*/
	protected $primaryKey = 'id';

	/*nome dos atributos que poderão ser não alterados*/
	protected $guarded	= [''];

	/*nome dos atributos que poderão ser alterados*/
	protected $fillable = ['name','description','type','paid','amount','date'];

		/*nome dos atributos que representam as horas*/
    public $timestamps = false;

    public function entry_categoryid(){
        return $this->hasMany(Category::class);
 	}
}
