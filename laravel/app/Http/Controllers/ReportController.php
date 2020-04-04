<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Entry;
use App\Category;

class ReportController extends Controller
{
    public function getByMonthAndYear($mes, $ano)
    {
        $mes= intval($mes);
        $ano= intval($ano);

        $entries = Entry::all();
        for($i=0; $i < sizeOf($entries); $i++){
            $explode = explode('/', $entries[$i]->date);
            if( intval($explode[1]) == $mes && intval($explode[2]) == $ano ){
                $consulta[] = $entries[$i];
            }
        }
        if(isset($consulta)){
            return response()->json( $consulta );
        }else{
            return ;
        }
    }
}
