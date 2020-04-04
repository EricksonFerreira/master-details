<?php
Route::get('report/month={mes}&year={ano}', 'ReportController@getByMonthAndYear')->name('report.grafico');

Route::apiResource('category','CategoryController');
Route::apiResource('entry','EntryController');
