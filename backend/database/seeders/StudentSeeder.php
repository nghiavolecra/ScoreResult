<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use League\Csv\Reader;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $path = storage_path('app/public/diem_thi_thpt_2024.csv');

        if (!file_exists($path)) {
            echo "File CSV không tồn tại: $path" . PHP_EOL;
            return;
        }

        $csv = Reader::createFromPath($path, 'r');
        $csv->setHeaderOffset(0);


        DB::disableQueryLog();

        $batch = [];
        $batchSize = 1000;
        $count = 0;


        foreach ($csv as $record) {
            $batch[] = [
                'sbd' => $record['sbd'],
                'toan' => $record['toan'],
                'ngu_van' => $record['ngu_van'],
                'ngoai_ngu' => $record['ngoai_ngu'],
                'vat_li' => $record['vat_li'],
                'hoa_hoc' => $record['hoa_hoc'],
                'sinh_hoc' => $record['sinh_hoc'],
                'lich_su' => $record['lich_su'],
                'dia_li' => $record['dia_li'],
                'gdcd' => $record['gdcd'],
                'ma_ngoai_ngu' => $record['ma_ngoai_ngu'],
            ];

            if (count($batch) >= $batchSize) {
                DB::table('students')->insert($batch);
                $count += count($batch);
                $batch = [];
            }


        }

        if (!empty($batch)) {
            DB::table('students')->insert($batch);
            $count += count($batch);
        }
        echo "Da import tong cong $count thi sinh tu CSV " . PHP_EOL;

    }
}
