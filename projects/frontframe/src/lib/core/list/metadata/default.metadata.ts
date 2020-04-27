import { DataType } from './../../enums/datatype.enum';
import { Align } from './../../enums/align.enum';
import { Metadata } from './metadata.component';

export class DefaultMetadata {
    public metadata: Metadata[] = [
        {
            fieldId: 'id',
            fieldName: 'Id',
            align: Align.RIGHT,
            dataType: DataType.NUMBER
        },
        {
            fieldId: 'status',
            fieldName: 'St.',
            title: 'Status',
            align: Align.CENTER,
            dataType: DataType.TEXT,
            hidden: true
        }
    ];

    public getMetadata(): Metadata[] {
        return this.metadata;
    }
}
