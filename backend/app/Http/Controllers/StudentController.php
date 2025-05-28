<?php

namespace App\Http\Controllers;
use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    //
    public function show($sbd)
    {
        $student = Student::where('sbd', $sbd)->first();

        if (!$student) {
            return response()->json(['message' => 'không tìm thấy thí sinh'], 404);
        }

        return response()->json($student);
    }

    public function reportsLevels()
    {
        $subjects = ['toan', 'ngu_van', 'ngoai_ngu', 'vat_li', 'hoa_hoc', 'sinh_hoc', 'lich_su', 'dia_li', 'gdcd'];

        $results = [];

        foreach ($subjects as $subject) {
            $results[$subject] = [
                '>=8' => Student::where($subject, '>=', 8)->count(),
                '6-8' => Student::where($subject, '<', 8)->where($subject, '>=', 6)->count(),
                '4-6' => Student::where($subject, '<', 6)->where($subject, '>=', 4)->count(),
                '<' => Student::where($subject, '<', 4)->count(),
            ];

        }


        return response()->json($results);
    }

    public function topgroupA()
    {
        $students = Student::select('*')
            ->selectRaw('(toan + vat_li + hoa_hoc) as total_group_a')
            ->orderByDesc('total_group_a')
            ->limit(10)
            ->get();

        return response()->json($students);
    }

    public function overall()
    {
        $total = Student::count();
        $avgScores = Student::selectRaw('
        AVG(toan) as avg_toan,
        AVG(vat_li) as avg_vat_li,
        AVG(hoa_hoc) as avg_hoa_hoc
    ')->first();

        return response()->json([
            'total_students' => $total,
            'average_scores' => $avgScores,
        ]);
    }

    public function subjectPerformance()
    {
        $subjects = ['toan', 'ngu_van', 'ngoai_ngu', 'vat_li', 'hoa_hoc', 'sinh_hoc', 'lich_su', 'dia_li', 'gdcd'];

        $performance = [];
        foreach ($subjects as $subject) {
            $performance[$subject] = [
                'avg' => round(Student::avg($subject), 2),
                'max' => Student::max($subject),
                'min' => Student::min($subject),
            ];
        }

        return response()->json($performance);
    }

    public function scoreDistribution($subject)
    {
        $result = [
            '>=8' => Student::where($subject, '>=', 8)->count(),
            '6-8' => Student::where($subject, '<', 8)->where($subject, '>=', 6)->count(),
            '4-6' => Student::where($subject, '<', 6)->where($subject, '>=', 4)->count(),
            '<' => Student::where($subject, '<', 4)->count(),
        ];

        return response()->json($result);
    }

    public function topBySubject(Request $request)
    {
        $subject = $request->query('subject');
        $limit = $request->query('limit', 5);

        if (!$subject || !in_array($subject, ['toan', 'ngu_van', 'ngoai_ngu', 'vat_li', 'hoa_hoc', 'sinh_hoc', 'lich_su', 'dia_li', 'gdcd'])) {
            return response()->json(['error' => 'Môn không hợp lệ'], 400);
        }

        $students = Student::orderByDesc($subject)->limit($limit)->get();

        return response()->json($students);
    }
}
