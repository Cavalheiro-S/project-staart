import { FilterListOutlined } from "@mui/icons-material"
import { FormControl, FormLabel, TextField, MenuItem } from "@mui/material"
import clsx from "clsx"
import { Text } from "./Text"

interface SelectFilterProps {
    filterValue: string,
    handleChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
    className?: string,
    options?: {
        value: string,
        label: string
    }[]
}

export const SelectFilter = ({ filterValue, handleChange, className, options }: SelectFilterProps) => {
    const renderOptions = () => {
        if (!options) return;
        return options.map((option, index) => <MenuItem key={index} value={option.value}>{option.label}</MenuItem>)
    }
    return (
        <FormControl className={clsx("flex flex-col items-start", className)}>
            <Text asChild>
                <FormLabel sx={{zIndex: "1"}} component="legend">
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
                {renderOptions() ?? (
                    [
                        <MenuItem key={0} value="standard">Padrão</MenuItem>,
                        <MenuItem key={1} value="alphabetic">Alfabética</MenuItem>,
                        <MenuItem key={2} value="courseTotal">Total de Cursos</MenuItem>
                    ]
                )}

            </TextField>
        </FormControl>
    )
}