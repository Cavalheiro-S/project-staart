import { FilterListOutlined } from "@mui/icons-material"
import { FormControl, FormLabel, TextField, MenuItem } from "@mui/material"
import clsx from "clsx"
import { Text } from "../../../components/Text"

interface SelectFilterProps {
    filterValue: string,
    handleChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
    className?: string
}

export const SelectFilter = ({ filterValue, handleChange, className }: SelectFilterProps) => {
    return (
        <FormControl className={clsx("flex flex-col items-start", className)}>
            <Text asChild>
                <FormLabel component="legend">
                    Filtrar por:
                </FormLabel>
            </Text>
            <TextField
                sx={{ margin: '0.5rem 0' }}
                className="w-full md:w-fit"
                select
                size="small"
                value={filterValue}
                InputProps={{
                    startAdornment: <FilterListOutlined className="text-primary mr-2" />
                }}
                onChange={handleChange}>
                <MenuItem value="standard">Padrão</MenuItem>
                <MenuItem value="alphabetic">Alfabética</MenuItem>
                <MenuItem value="courseTotal">Total de Cursos</MenuItem>
            </TextField>
        </FormControl>
    )
}